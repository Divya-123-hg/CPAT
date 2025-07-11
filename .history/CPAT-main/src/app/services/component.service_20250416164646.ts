import { Injectable } from '@angular/core';
import { Observable ,of} from 'rxjs';
import { ComponentItem } from '../component.service';

export interface ComponentData{
  id:number;
  name:string;
  description:string;
  url:string;
}

@Injectable({
  providedIn: 'root'
})
export class ComponentService {
  push(arg0: { name: string; description: string; url: string; }) {
    throw new Error('Method not implemented.');
  }
  addComponent(newComponent: ComponentItem) {
    throw new Error('Method not implemented.');
  }

  constructor() { }

  getComponents(): Observable<ComponentData[]> {
    const components: ComponentData[] = [
      // {id: 1, name: 'Login Form', description: 'Reusable login form', url:'https://example.com/login'},
      // {id: 2, name: 'Navbar', description: 'Responsive Navbar', url:'https://example.com/navbar'}
    ];
    return of(components);
  }
}
export type { ComponentItem };

