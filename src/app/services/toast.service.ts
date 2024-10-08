import { Injectable, TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toasts: any[] = [];

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    const defaultOptions = { classname: 'bg-info text-light', delay: 5000 };
    const toast = { textOrTpl, ...defaultOptions, ...options };

    this.toasts.push(toast);

    setTimeout(() => this.remove(toast), toast.delay);
  }

  remove(toast: any) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

  showSuccess(message: string, delay: number = 5000) {
    this.show(message, { classname: 'bg-success text-light', delay });
  }

  showDanger(message: string, delay: number = 5000) {
    this.show(message, { classname: 'bg-danger text-light', delay });
  }

  showInfo(message: string, delay: number = 5000) {
    this.show(message, { classname: 'bg-info text-light', delay });
  }

  showWarning(message: string, delay: number = 5000) {
    this.show(message, { classname: 'bg-warning text-dark', delay });
  }
}
