import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'order-info',
  templateUrl: './order-info.component.html',
  styleUrls: ['../order.component.scss']
})

export class OrderInfoComponent implements OnInit {
  id: string;
  cost: number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.cost = this.route.snapshot.params.cost;
  }
}
