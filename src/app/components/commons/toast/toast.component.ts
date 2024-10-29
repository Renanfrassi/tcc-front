import { Component, TemplateRef } from '@angular/core';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent {
  constructor(public toastService: ToastService) {
  }

  // Verifica se o conteúdo do toast é um template
  isTemplate(toast: any) {
    return toast.textOrTpl instanceof TemplateRef;
  }

  // Remove o toast quando ele é oculto
  removeToast(toast: any) {
    this.toastService.remove(toast);
  }
}
