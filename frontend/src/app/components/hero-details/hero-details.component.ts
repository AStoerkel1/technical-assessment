import { BackendService } from '../../services/backend.service';
import { Component, OnInit} from '@angular/core';
import { Hero } from '../../types/Hero';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hero-details',
  templateUrl: './hero-details.component.html',
  styleUrls: ['./hero-details.component.css']
})
export class HeroDetailsComponent implements OnInit {
  id: string = "";
  hero: Hero = {
    id:"",
    name: "",
    class: "",
    level: 0
  };
  constructor(private backend: BackendService, private route: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    //gets the id from the route
    this.id = this.route.snapshot.params.id;
    // Gets a hero by it's ID
    this.hero = await this.backend.getHeroById(this.id);
  }

}
