import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  async actualizarFoto(
    file: File,
    collection: 'users'|'doctors'|'hospitals',
    id: string
  ) {
    
    try {
      
      const url = `${base_url}/upload/${collection}/${id}`;
      const formData = new FormData();
      formData.append('image', file);

      const resp = await fetch(url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      });

      const data = await resp.json();
      
      if(data.ok){
        return data.path;
      } else{
        console.log(data);
        return false;
      }

            
    } catch (error) {
      console.log(error);
      return false;
    }

  }
}
