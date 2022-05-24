import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as fs from 'fs'

@Injectable({
  providedIn: 'root'
})
export class InformacionServiceService {
  constructor(private http: HttpClient) { }

  private DataSource: string = 'assets/static/data.txt';

  public get_info() {
    return new Promise((resolve, reject) => {
      try {
        if(localStorage.getItem('Registros') == null){
          fetch(this.DataSource)
          .then(response => response.text())
          .then(data => {
            // Do something with your data
            resolve(JSON.parse(data));
          });
        }else{
          resolve(JSON.parse(localStorage.getItem('Registros')));
        }
      } catch (err) {
        reject(err)
      }
    })
  }

  public post_info(data) {
    debugger
    localStorage.setItem('Registros', JSON.stringify(data));
  }

}