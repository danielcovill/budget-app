import { Component, OnInit } from '@angular/core';
import { ipcRenderer } from 'electron';

@Component({
  selector: 'app-open-database',
  templateUrl: './open-database.component.html',
  styleUrls: ['./open-database.component.scss']
})
export class OpenDatabaseComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
