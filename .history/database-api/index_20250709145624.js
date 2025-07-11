
const express = require('express'); //to link front and backend
const cors = require('cors'); //Cross-Origin Resource Sharing
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = 3000;
app.use(cors());

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'componentsdb',
    post: 5432,
    password: '1234',
});

app.use(cors());
app.use(bodyParser.json());


//Fetch Components based on table name
app.get('/api/components/table/:table/:username', async (req, res) => {
    const table = req.params.table.toLowerCase();
    const name = req.params.username.toLowerCase();
    let result;
    try {
        if (table == 'components') {
            result = await pool.query(`select * from ${table} where lower(created_by) = lower($1) order by id desc `, [name]);
            res.json(result.rows);
        }
        else {
            result = await pool.query(`select * from ${table} order by id desc `);
            res.json(result.rows);
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//Fetch components from components table
app.get('/api/components', async (req, res) => {
    try {
        const result = await pool.query('select * from components');
        res.json(result.rows);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//Fetch components by id
app.get('/api/components/id/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await pool.query('select * from components where id=$1', [id]);
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }

});

//Fetch components by status
app.get('/api/components/:selected/:username', async (req, res) => {
    try {
        const status = req.params.selected.toLowerCase();
        const username = req.params.username.toLowerCase();
        if (status == 'all') {
            if (username == 'reviewer_table') {
                const result = await pool.query('select * from reviewer_table');
                res.json(result.rows);
            } else if (username == 'approver_table') {
                const result = await pool.query('select * from approver_table');
                res.json(result.rows);
            } else {
                const result = await pool.query('select * from components where lower(created_by) = $1', [username]);
                res.json(result.rows);
            }
        } else {
            if (username == 'reviewer_table') {
                const result = await pool.query('select * from reviewer_table  where lower(status)=$1', [status]);
                res.json(result.rows);
            } else if (username == 'approver_table') {
                const result = await pool.query('select * from approver_table  where lower(status)=$1', [status]);
                res.json(result.rows);
            } else {
                const result = await pool.query('select * from components where lower(status)=$1 and lower(created_by) = $2', [status, username]);
                res.json(result.rows);
            }

        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//Fetch components by component name
app.get('/api/components/searchText/searchText/:searchText/:username', async (req, res) => {
    try {
        const searchText = req.params.searchText.toLowerCase();
        const username = req.params.username;
        console.log(username, 'lalalallala');
        if (username == 'reviewer_table') {
            const result = await pool.query('select * from reviewer_table where lower(name) like $1', [`%${searchText}%`]);
            res.json(result.rows);
        } else if (username == 'approver_table') {
            const result = await pool.query('select * from approver_table where lower(name) like $1', [`%${searchText}%`]);
            res.json(result.rows);
        } else {
            const result = await pool.query('select * from components where lower(name) like $1 and created_by = $2', [`%${searchText}%`, username]);
            res.json(result.rows);
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//add new components
app.post('/api/components', async (req, res) => {
    const { name, description, url, created_by } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO COMPONENTS (name,description,url,status,created_by) values($1,$2,$3,$4,$5) returning *',
            [name, description, url, 'Pending For Review', created_by]
        );
        const id = result.rows[0].id;
        const notify = `Component ${id} uploaded by ${created_by}`;

        const result1 = await pool.query(
            'INSERT INTO reviewer_table(id, name, description, url, status, created_by,reviewed_by, notification) SELECT id, name, description, url, status, created_by, reviewed_by, $2 from components WHERE id = $1 returning *',
            [id, notify]
        );
        res.json(result1.rows[0], result.rows[0]);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});

//Update component status
app.post('/api/components/:status', async (req, res) => {
    try {
        const { id, name } = req.body;
        const status = req.params.status.toLowerCase();
        let result, result1 = null, result2, result3, result4, result5;
        const notify = `Component ${id} is ${status} by ${name}`;
        const anotify = `Component ${id} is ${status} by ${name}`;
        console.log(notify);
        if (status === 'reviewed' || status === 'returned') {
            result = await pool.query(
                'UPDATE components SET status = $1, reviewed_at = NOW(), reviewer_status = $1,reviewed_by=$3, notification=$4 WHERE id = $2 returning *',
                [status, id, name, notify]
            );

            result2 = await pool.query(
                'UPDATE reviewer_table SET status = $1, reviewed_at = NOW(), reviewer_status = $1,reviewed_by=$3 WHERE id = $2 returning *',
                [status, id, name]
            );
            if (status === 'reviewed') {
                result1 = await pool.query(
                    'INSERT INTO approver_table(id, name, description,created_by,reviewed_by, notification) SELECT id, name, description,created_by,reviewed_by,$2 FROM reviewer_table WHERE id = $1 returning *',
                    [id, anotify]
                );
            }
            result3 = await pool.query(
                'UPDATE approver_table SET status = $1, reviewed_at = NOW(), reviewer_status = $1 WHERE id = $2 returning *',
                [status, id]
            );
        } if (status === 'approved' || status === 'rejected') {
            result = await pool.query(
                'UPDATE components SET status = $1, approved_at = NOW(), approver_status = $1,approved_by=$3, notification=$4  WHERE id = $2 returning *',
                [status, id, name, notify]
            );
            result2 = await pool.query(
                'UPDATE reviewer_table SET status = $1, approved_at = NOW(), approver_status = $1,approved_by=$3 WHERE id = $2 returning *',
                [status, id, name]
            );
            result3 = await pool.query(
                'UPDATE approver_table SET status = $1, reviewed_at =NOW(), reviewer_status = $1,approved_by=$3 WHERE id = $2 returning *',
                [status, id, name]
            );
        } if (status === 'rejected' || status === 'returned') {
            let result4;
            try {
                result4 = await pool.query(
                    'insert into compHistory(compid,name,description,url,status,created_by,reviewed_by,approved_by,created_at,reviewed_at,approved_at,reviewer_feedback,approver_feedback,returned_by) select id,name,description,url,status,created_by,reviewed_by,approved_by,created_at,reviewed_at,approved_at,reviewer_description,approver_feedback,$2 from components where id=$1 returning *', [id, name]
                );
            } catch (err) {
                console.log(err);
            }
        }
        res.status(200).json({ message: 'Component status updated successfully', result, result1 });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//add reviewer comments
app.post('/api/components/comment/comment/comment/:comment', async (req, res) => {
    try {
        const { id } = req.body;
        const comment = req.params.comment;
        const result = await pool.query(
            'update components set reviewer_description = $1 where id =$2', [comment, id]
        );
        res.status(200).json({ message: 'feedback uploaded successfully', result });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//add approver comments
app.post('/api/components/feedback/feedback/feedback/feedback/:feedback', async (req, res) => {
    try {
        const { id } = req.body;
        const feedback = req.params.feedback;
        const result = await pool.query(
            'update components set approver_feedback = $1 where id =$2', [feedback, id]
        );
        res.status(200).json({ message: 'feedback uploaded successfully', result });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//delete the component based on id
app.delete('/api/components/id/:id', async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        const status = await pool.query('select status from components where id=$1', [id]);
        console.log(status.rows[0].status);
        const result = await pool.query('DELETE FROM components WHERE id=$1 RETURNING *', [id]);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//set the status to more information required
app.post('/api/components/info/info/:id/id/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const comment = 'more info';
        const result = await pool.query('update components set status=$3, approver_feedback=$1, approver_by where id=$2', [comment, id, "More Details Required"]);
        const result1 = await pool.query('update approver_table set status=$3, approver_feedback=$1 where id=$2', [comment, id, "More Details Required"]);
        res.json(result.rows);
        console.log(result.rows);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//Edit the component
app.post('/api/components/id/id/id/id/id', async (req, res) => {
    const { name, description, url, created_by, id } = req.body;
    newid = id;
    let status;
    try {
        const result3 = await pool.query(
            `select status from components where id=$1`, [id]
        );
        console.log(result3.rows[0]);
        if (result3.rows[0].status === 'More Details Required') {
            console.log('inside if block', result3.rows);
            const result = await pool.query(
                `update components set status=$1, description=$2 where id=$3`, ['Information Added', description, id]
            );
            const result2 = await pool.query(
                `update approver_table set status=$1, description=$2 where id=$3`, ['Information Added', description, id]
            );
        } else {
            const result = await pool.query(
                `UPDATE COMPONENTS SET name = $1, description = $2, url = $3, status = $4, created_by = $5, approved_by=$7, approved_at=$8, reviewed_at=$9, reviewed_by=$10, reviewer_status=$11, approver_status=$12, reviewer_description=null, approver_feedback=null WHERE id = $6 returning *`, [name, description, url, 'Pending For Review', created_by, id, null, null, null, null, null, null]
            );
            const result1 = await pool.query(
                `UPDATE reviewer_table SET name = $1, description = $2, url = $3, status = $4, created_by = $5, approved_at=$8, reviewed_at=$9, reviewer_status=$10, approver_status=$11 WHERE id = $6 returning *`, [name, description, url, 'Pending For Review', created_by, id, null, null, null, null]
            );
            const result2 = await pool.query(
                `UPDATE approver_table SET name = $1, description = $2, url = $3, status = $4, created_by = $5, approved_at=$7, reviewed_at=$8, reviewer_status=$9, approver_status=$10 WHERE id = $6 returning *`, [name, description, url, 'Reviewed', created_by, id, null, null, null, null]
            );
        }
        res.json(result, result1, result2);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});

//sending notifications to the contributor
app.get('/api/components/a/a/a/a/a/a/a/a/a/a/a/a/a/:name/:table', async (req, res) => {
    const name = req.params.name;
    const table = req.params.table;
    try {

        if (table === 'components') {
            const result = await pool.query(`select * from components where lower(created_by)=lower($1) and notification is not null`, [name]);
            console.log(result.rows);
            res.json(result.rows);
        } else if (table === 'reviewer_table') {
            const result = await pool.query(`select * from reviewer_table where notification is not null`);
            console.log(result.rows);
            res.json(result.rows);
        } else if (table === 'approver_table') {
            const result = await pool.query(`select * from approver_table where notification is not null`);
            console.log(result.rows);
            res.json(result.rows);
        }

    } catch (err) {
        console.log(err);
    }
});

//deleting notification
app.post('/api/components/put/a/a/a/a/a/a/a/a/a/a/a/a/notification', async (req, res) => {
    const { id, table } = req.body;
    console.log(id);
    try {
        if (table === 'components') {
            const result = await pool.query(`update components set notification=null where id=$1`, [id]);
            console.log(result.rows);
            res.json(result);
        } else if (table === 'reviewer_table') {
            const result = await pool.query(`update reviewer_table set notification=null where id=$1`, [id]);
            console.log(result.rows);
            res.json(result);
        } else if (table === 'approver_table') {
            const result = await pool.query(`update approver_table set notification=null where id=$1`, [id]);
            console.log(result.rows);
            res.json(result);
        }
    } catch (err) {
        console.log(err);
    }
})

//display component history based on id
app.get('/api/components/id/:id/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await pool.query(`select * from compHistory where compid = $1`, [id]);
        res.json(result.rows);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


//USER TABLE

//fetch users from users table
app.get('/api/users', async (requestAnimationFrame, res) => {
    try {
        const result = await pool.query('select * from users');
        res.json(result.rows);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/api/users/:username', async (req, res) => {
    try {
        const status = req.params.username;
        console.log(status);
        const result = await pool.query('select * from users where username =$1', [status]);
        res.json(result.rows);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//Add users
app.post('/api/users', async (req, res) => {
    const { role, username, password } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO USERS (role,username,password) values($1,$2,$3)',
            [role, username, password]
        );
        res.json(result.rows[0]);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});

//delete users
app.delete('/api/users/id/:name/id', async (req, res) => {
    try {
        const id = req.params.name;
        console.log(id);
        const result = await pool.query('DELETE FROM users WHERE lower(username)=lower($1)', [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully', component: result.rows[0] });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//Defines the running port
app.listen(port, () => {
    console.log(`server running at http://localhost:${port}`);
});