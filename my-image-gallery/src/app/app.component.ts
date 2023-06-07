import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Injectable, TemplateRef } from '@angular/core';
import './app.component.css';

interface Image {
  id: number;
  webformatURL: string;
}

@Component({
  selector: 'app-root',
  template: `
    <h1 >No Pixabay Gallery</h1>
    <div style="  justify-content: center;  display: flex;">
    <button class="btn btn-success" (click)="openSettings()" ngbTooltip="Will disappear in 5s">Настройки</button>
    <button class="btn btn-success" (click)="loadMotorcycles()">Мотоциклы</button>
    <button class="btn btn-success" (click)="loadNature()">Природа</button>
    <button class="btn btn-success" (click)="loadSpace()">Космос</button>
    <button class="btn btn-success" (click)="loadArchitecture()">Архитектура</button>
    </div>
    <div *ngIf="currentTab === 'settings'">
      <h2>Настройки</h2>
      <input [(ngModel)]="apiKey" placeholder="Введите ваш API ключ">
      <button (click)="saveApiKey()">Сохранить</button>
      <a href="https://pixabay.com/ru/service/about/api/">Нет ключа ? Не беда ! Клик ^.^</a>
    </div>
    <div class="row">
      <div class="column">
    <div *ngIf="currentTab === 'motorcycles'">
      <h2>Мотоциклы</h2>
      <ngb-carousel
        #carousel
        [interval]="2000"
        style="height: 1000px"
      >
        <ng-template ngbSlide *ngFor="let image of images">
          <div class="carousel-caption">
          </div>
            <div style="justify-content: center; display: flex" class="picsum-img-wrapper">
              <img  style="height: 1000px;" [src]="image.webformatURL" [alt]="image.tags" onclick="myFunction(this)">
            </div>
        </ng-template>
      </ngb-carousel>

<!--      <div *ngFor="let image of images">-->
<!--        <img [src]="image.webformatURL" [alt]="image.tags" onclick="myFunction(this)">-->
<!--      </div>-->
    </div>
      </div>
        <div class="column">
    <div *ngIf="currentTab === 'nature'">
      <h2>Природа</h2>
      <ngb-carousel
        #carousel
        [interval]="2000"
        style="height: 1000px"
      >
        <ng-template ngbSlide *ngFor="let image of images">
          <div class="carousel-caption">
          </div>
          <div style="justify-content: center; display: flex" class="picsum-img-wrapper">
            <img  style="height: 1000px;" [src]="image.webformatURL" [alt]="image.tags" onclick="myFunction(this)">
          </div>
        </ng-template>
      </ngb-carousel>
    </div>
        </div>
        <div class="column">
    <div *ngIf="currentTab === 'space'">
      <h2>Космос</h2>
      <ngb-carousel
        #carousel
        [interval]="2000"
        style="height: 1000px"
      >
        <ng-template ngbSlide *ngFor="let image of images">
          <div class="carousel-caption">
          </div>
          <div style="justify-content: center; display: flex" class="picsum-img-wrapper">
            <img  style="height: 1000px;" [src]="image.webformatURL" [alt]="image.tags" onclick="myFunction(this)">
          </div>
        </ng-template>
      </ngb-carousel>
    </div>
        </div>
        <div class="column">
    <div *ngIf="currentTab === 'architecture'">
      <h2>Архитектура</h2>
      <ngb-carousel
        #carousel
        [interval]="2000"
        style="height: 1000px"
      >
        <ng-template ngbSlide *ngFor="let image of images">
          <div class="carousel-caption">
          </div>
          <div style="justify-content: center; display: flex" class="picsum-img-wrapper">
            <img  style="height: 1000px;" [src]="image.webformatURL" [alt]="image.tags" onclick="myFunction(this)">
          </div>
        </ng-template>
      </ngb-carousel>
    </div>
        </div>
    </div>
          <div class="container">
            <span onclick="this.parentElement.style.display='none'" class="closebtn">×</span>
            <img id="expandedImg" style="width:100%">
            <div id="imgtext"></div>
          </div>


  `,
  styles: [`

  `],
})
export class AppComponent {
  apiKey: string="";
  currentTab: string;
  images: any[];

  constructor(private http: HttpClient) {
    this.currentTab = '';
    this.images = [];
  }

  openSettings() {
    this.currentTab = 'settings';
  }

  saveApiKey() {
    localStorage.setItem('apiKey', this.apiKey);
  }

  loadMotorcycles() {
    this.currentTab = 'motorcycles';
    this.loadImages('Motorcycles');
  }

  loadNature() {
    this.currentTab = 'nature';
    this.loadImages('Nature');
  }
  loadSpace() {
    this.currentTab = 'space';
    this.loadImages('Space');
  }

  loadArchitecture() {
    this.currentTab = 'architecture';
    this.loadImages('Architecture');
  }

  loadImages(category: string) {
    const apiKey = localStorage.getItem('apiKey');

    if (apiKey) {
      const url = `https://pixabay.com/api/?key=${apiKey}&q=${category}&per_page=40`;
      this.http.get<any>(url).subscribe((response: any) => {
        this.images = response.hits;
      });
    } else {
      console.log('Введите API ключ');
    }
  }
}
