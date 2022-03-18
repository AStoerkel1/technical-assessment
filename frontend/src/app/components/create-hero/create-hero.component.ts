import { BackendService } from '../../services/backend.service';
import { Component, OnInit } from '@angular/core';
import { Hero } from 'src/app/types/Hero';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-hero',
  templateUrl: './create-hero.component.html',
  styleUrls: ['./create-hero.component.css']
})
export class CreateHeroComponent implements OnInit {
  
  name: string = "";
  class: string = "";
  level: number = 1;
  
  constructor(private backend: BackendService, private router: Router) { }

  ngOnInit(): void {
  }

  /**
   * creates a new Hero object and posts it to
   * the backend API
   */
  async onSubmit(){

    const newHero: Hero = {
      id: "",
      name: this.name,
      class: this.class,
      level: this.level,
    }

    await this.backend.createHero(newHero).then(val => {
      console.log(val);
      alert("Hero created successfully");
    }).catch(err=> {
      console.log(err);
      alert(err.message)
    });

    this.router.navigateByUrl('/');
  }

}
