import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { catchError } from 'rxjs';
import { PostGet } from 'src/app/interface/post';
import { PostService } from 'src/app/service/post.service';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  newDate!: {}

  constructor(private postSrv: PostService) { }


  ngOnInit(): void {
  }

  sendPost(form: NgForm) {
    this.getDate()
    let data: PostGet = {
      title: form.value.title,
      description: form.value.description,
      emoji: form.value.emoji,
      commenti: [],
      date: this.newDate
    }

    this.postSrv.posta(data).pipe(catchError(err => {
      console.log(err);
      throw err
    })).subscribe(res => {
      console.log(res);

    })
  }

  getDate() {
    let date = new Date()
    let m = date.getMonth()
    let d = date.getDate()
    let h = date.getHours()
    let mi = date.getMinutes()
    let orario = {
      mese: m,
      giorno: d,
      ora: h,
      minuti: mi
    }
    this.newDate = orario

  }
}
