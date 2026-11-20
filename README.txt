ECONOMIA — PWA (APLICATIVO WEB PROGRESSIVO)

ARQUIVOS
- economia-resumos.html: aplicação de Economia (módulos 5 a 10 e aba Formulário).
- manifest.webmanifest: nome, ícones e configurações de instalação.
- sw.js: cache do aplicativo e suporte para abrir a aplicação offline.
- icons/: ícones 192x192 e 512x512.

COMO PUBLICAR
1. Envie TODOS os arquivos e a pasta icons para a mesma pasta do seu site/servidor.
2. Preserve o nome economia-resumos.html (ele é usado pelo manifesto e pelo service worker).
3. Publique em HTTPS. Para desenvolvimento local, use um servidor em localhost; abrir o HTML diretamente por file:// não ativa o service worker.
4. Acesse https://SEU-DOMINIO/CAMINHO/economia-resumos.html.
5. Em navegadores compatíveis, use o botão “Instalar aplicativo” quando ele aparecer. No iPhone/iPad, use Compartilhar > Adicionar à Tela de Início.

USO OFFLINE
Após a primeira abertura online e a instalação do service worker, a aplicação e seus módulos ficam disponíveis no cache para uso offline. As fontes do Google são externas; sem internet, o navegador usa as fontes locais alternativas já definidas no CSS.

ATUALIZAÇÕES
Quando substituir os arquivos no servidor, incremente CACHE_NAME em sw.js (por exemplo, economia-pwa-v2) para publicar uma nova versão de cache.
