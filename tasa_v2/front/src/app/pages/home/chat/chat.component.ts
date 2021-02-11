import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigurationService } from 'src/app/shared/services/configuration.service';
import { DataApiService } from 'src/app/shared/services/data-api.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { environment } from 'src/environments/environment';
import { LandsService } from '../farms/calendar/lands.service';
import moment from 'moment';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  //mocks
  user = {
    name: "Camilo Perez",
    id: 123
  }

  conversation = []

  message = '';
  chat;
  click = false;
  scrollPerson = false;
  count = 0;

  constructor(
    public configService: ConfigurationService,
    public storageService: StorageService,
    public dataApiService: DataApiService,
    public landsService: LandsService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.landsService.idProperty = this.route.snapshot.paramMap.get(
      'idProperty'
    );
    this.landsService.idLand = this.route.snapshot.paramMap.get('idLand');
    this.landsService.getLandById(
      this.landsService.idProperty,
      this.landsService.idLand
    );
  }

  ngOnInit(): void {
    let root = document.documentElement;
    root.style.setProperty("--height-value", this.heightScreenChat(this.configService.screen, this.configService.screenHeight) + "px");
    this.user = this.storageService.getValue('user');
    this.getMessage();
    this.chat = setInterval(() => {
      this.getMessage();
    }, 2000);
    const out = document.getElementById("chat");
    setInterval(() => {
      const isScrolledToBottom = out.scrollHeight - out.clientHeight <= out.scrollTop + 1;

      if (this.count !== 0 && !isScrolledToBottom) {
        this.scrollPerson = true
      }
      // scroll to bottom if isScrolledToBottom is true
      if (!isScrolledToBottom && !this.scrollPerson) {
        out.scrollTop = out.scrollHeight - out.clientHeight;
        this.count = 1
      }
    }, 500)
  }

  ngOnDestroy() {
    if (this.chat) {
      clearInterval(this.chat);
    }
  }

  getMessage() {
    const idLand = parseInt(this.landsService.idLand);
    return this.dataApiService.getAll(`get_chat_message?land_id=${idLand}`, environment.urlNotifications).then((chat) => {
      this.conversation = chat[0].map((data) => {
        data.created_date = moment(data.created_date).format('hh:mm A');
        return data;
      });
    })
  }

  sendMessage() {
    if (!this.message || this.click) {
      return;
    }
    this.click = true;
    const idLand = parseInt(this.landsService.idLand);
    return this.dataApiService.post({ id_land: idLand, message: this.message }, 'set_chat_message', environment.urlNotifications).then(data => {
      return this.getMessage().then(() => {
        this.message = '';
        this.click = false;
        this.scrollPerson = false;
        this.count = 0;
      })
    });
  }

  goBack() {
    this.router.navigate(['/farms/calendar/', this.landsService.idProperty, this.landsService.idLand]);
  }

  heightScreenChat(width, height): number {
    if (width > 1300) {
      return height - 116;
    } else if (width > 992) {
      return height - 75;
    } else if (width > 768) {
      return height - 71;
    } else if (width > 544) {
      return height - 65;
    } else {
      return height - 55;
    }
  }

}
