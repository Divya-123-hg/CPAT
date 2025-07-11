import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ComponentDataService {
  private components = [
    {
    id: 1,
    name: 'Button UI',
    description: 'Reusable button component',
    url: 'https://example.com/button'
  },
  {
    id: 2,
    name: 'Card UI',
    description: 'Card layout for dashboards',
    url: 'https://example.com/card'
  }
];
  apiUrl: any;
  http: any;
getComponents(){
  return this.components;
}



addComponent(component:{name: string, description:string,url: string}){
  const newComponent = {
    id: this.components.length+1,
    ...component
  };
  this.components.push(newComponent);
}
}
