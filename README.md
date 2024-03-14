# Empresarial BGH - Sistema Empresarial de Controle e Vendas.

Repositório do Sistema Empresarial BGH, um sistema que  utiliza o framework Ruby on Rails, com Banco de Dados PostgreSQL e Rails 7.

O Sistema consiste em módulos de uso, seja somente para um módulo, ou para mais, o uso é livre. O Suporte só contará para a compra do suporte e/ou encomenda de personalização do sistema para sua empresa.

Caso queira utilizar o sistema, dependências necessárias para o projeto:

* Ruby => versão 3.2.2.

* Dependências - PostgreSQL

* Dependências - Rails => versão 7.1.3 (Rodando o bundle install no rails 3.2.2 ele automaticamente instalará esse rails).

* Configuração:

-  Com o Ruby instalado, inicie o CMD (Prompt de Comando) e digite: CD "Caminho do diretório/empresarialBGH" => Note que o "Caminho do diretório" é para ser colocado o caminha que constará onde estiver o diretório do sistema, por exemplo "C:/Users/UserExemplo/empresarialBGH".
-  Nota: O diretório(pasta) que armazenará o sistema não poderá conter caracteres especiais(~ ´ etc).
-  Note que o arquivo no caminho => config => database.yml - Pode ser aberto para colocar o usuario e a senha do Banco de Dados SQL nos campos username e password no começo do arquivo

### Após isso, siga os passos a seguir:

-  Digite o comando => bundle install - Instalará as dependências do sistema, assim como o rails de versão 7.1.3

-  Digite o comando => Rails dev:setup - Criará o Banco de Dados e irá popular com um usuário teste para cada login (user@user.com - senha 123456 e admin@admin.com - senha 123456).

-  Após isso poderá levantar o servidor (rails s -b 0.0.0.0) - Iniciará o servidor com endereço localhost:3000 no navegador para a maquina que está o servidor e para celulares e/ou computadores alternativos CONECTADOS NA MESMA REDE INTERNA, será necessário procurar seu IpV4 (CMD => ipconfig) e entrar com o numero_do_seu_ip:3000.

-  AVISO: A utilização sem suporte fica totalmente por conta e risco do usuário caso ocorram problemas de corrompimento do Banco de Dados.
  

* Criado e desenvolvido por João Temochko e Beasts, Goblins and Hellfire Development

## Você está livre para alterar por sua conta e publicar a alteração que fez em seu próprio GitHub com os devidos créditos em seu README.
* Se não for publicado no Github é dispensado dar os devidos créditos.

