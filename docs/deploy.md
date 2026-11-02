# Deploy gratuito com Render e TiDB Cloud

## 1. Criar o banco TiDB Cloud

1. Crie um cluster Serverless no TiDB Cloud e escolha a opção gratuita, se estiver disponível para sua conta e região.
2. Crie as credenciais de conexão e autorize os endereços de saída necessários conforme as instruções exibidas pelo TiDB Cloud. Não publique usuário, senha ou outros segredos.
3. Execute `src/config/schema.sql` no SQL Editor do TiDB Cloud para criar `batman_db` e a tabela `comentarios`.
4. Copie os valores de host, usuário e senha fornecidos pelo painel. O endpoint Serverless normalmente usa a porta `4000`; confirme o valor no painel.

## 2. Publicar no Render

1. No Render, crie um Blueprint a partir do repositório `andremartinsadr/batman-app` ou conecte o repositório e use o arquivo `render.yaml`.
2. Na configuração do serviço, preencha `DB_HOST`, `DB_USER` e `DB_PASSWORD` com os valores do TiDB Cloud. O Blueprint define `DB_PORT=4000`, `DB_NAME=batman_db` e TLS (`DB_SSL=true`).
3. Não inclua credenciais em arquivos do repositório. Cadastre-as somente nos campos protegidos de variáveis de ambiente do Render.
4. Aguarde o build e o deploy terminarem. O Render fornece a URL pública do serviço, geralmente terminada em `onrender.com`.
5. Teste a página inicial na URL pública e a API em `/api/comentarios`.

O serviço Render gratuito pode entrar em suspensão após um período sem acesso e demorar alguns segundos para responder na primeira visita. Disponibilidade dos planos gratuitos pode variar por conta e região.

## Variáveis de ambiente

| Variável | Valor |
| --- | --- |
| `DB_HOST` | Host do cluster exibido pelo TiDB Cloud |
| `DB_PORT` | Porta do cluster (normalmente `4000`) |
| `DB_USER` | Usuário criado no TiDB Cloud |
| `DB_PASSWORD` | Senha do usuário; configurar apenas no Render |
| `DB_NAME` | `batman_db` |
| `DB_SSL` | `true` para exigir TLS com validação do certificado |
| `PORT` | Definida automaticamente pelo Render |
