import { Component } from '@angular/core';
import { ArquivoService } from 'src/app/services/arquivo.service';
import { CartaoService } from 'src/app/services/cartao.service';
import { ConfirmDialogService } from 'src/app/services/confirm-dialog.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-floating-button',
  templateUrl: './floating-button.component.html',
  styleUrls: ['./floating-button.component.scss']
})
export class FloatingButtonComponent {

  constructor(private _cartaoService: CartaoService, private _arquivoServide: ArquivoService, private toastService: ToastService,
    private loaderService: LoaderService,
    private dialogModal: ConfirmDialogService) { }

  onClick() {

    this.dialogModal.confirm('Confirmação', 'Tem certeza que deseja continuar a Sincronização?', 'Confirmar', 'Cancelar', 'info').then(
      result => {
        if (result) {
          this.loaderService.show();

          this._cartaoService.gerarArquivoCartao().subscribe(
            result => {
              result.forEach(file => {
                this._arquivoServide.downloadTxt(file.fileName, file.listaHorario);
              })
              this.loaderService.hide();
              this.toastService.showSuccess("Arquivos Gerados com Sucesso!!");
            },
            error => {
              this.toastService.showDanger("Ocorreu um erro ao gerar os Arquivo de Permissão!!");
            }
          )
        }
      }
    )


  }

}
