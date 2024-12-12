import { Injectable } from "@angular/core";

@Injectable({
    providedIn : 'root',
})
export class ArquivoService {

    arrayDeStrings: string[] = [
        'Linha 1 do arquivo',
        'Linha 2 do arquivo',
        'Linha 3 do arquivo',
      ];
    
      downloadTxt(fileName : string, lista : string[]) {
        // Concatena o array em um único texto com quebra de linha
        const conteudo = lista.join('\n');
    
        // Cria um blob com o conteúdo em texto
        const blob = new Blob([conteudo], { type: 'text/plain' });
    
        // Cria uma URL para o blob
        const url = window.URL.createObjectURL(blob);
    
        // Cria um elemento de link <a> e configura o download
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
    
        // Simula o clique no link
        a.click();
    
        // Libera a URL após o uso
        window.URL.revokeObjectURL(url);
      }

}