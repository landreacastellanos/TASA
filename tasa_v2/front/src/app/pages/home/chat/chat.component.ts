import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigurationService } from 'src/app/shared/services/configuration.service';
import { DataApiService } from 'src/app/shared/services/data-api.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { environment } from 'src/environments/environment';
import { LandsService } from '../farms/calendar/lands.service';
import { ChatService } from './chat.service';

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

  message = '';
  chat;
  click = false;

  constructor(
    public configService: ConfigurationService,
    public storageService: StorageService,
    public dataApiService: DataApiService,
    public landsService: LandsService,
    private route: ActivatedRoute,
    private router: Router,
    public chatService: ChatService
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
    this.chatService.getMessage();
    this.chat = setInterval(() => {
      this.user = this.storageService.getValue('user');
    this.chatService.getMessage();
    }, 2000);
    const out = document.getElementById("chat");
    setInterval(() => {
      const isScrolledToBottom = out.scrollHeight - out.clientHeight <= out.scrollTop + 1;

      if (this.chatService.count !== 0 && !isScrolledToBottom) {
        this.chatService.scrollPerson = true
      }
      // scroll to bottom if isScrolledToBottom is true
      if (!isScrolledToBottom && !this.chatService.scrollPerson) {
        out.scrollTop = out.scrollHeight - out.clientHeight;
        this.chatService.count = 1
      }
    }, 500)
  }

  ngOnDestroy() {
    if (this.chat) {
      clearInterval(this.chat);
    }
  }

  sendMessage() {
    if (!this.message || this.click) {
      return;
    }
    this.click = true;
    const idLand = parseInt(this.landsService.idLand);
    return this.dataApiService.post({ id_land: idLand, message: this.message }, 'set_chat_message', environment.urlNotifications).then(data => {
      return this.chatService.getMessage().then(() => {
        this.message = '';
        this.click = false;
        this.chatService.scrollPerson = false;
        this.chatService.count = 0;
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
    } else if (width > 416) {
      return height - 56;
    } else {
      return height - 86;
    }
  }

}
