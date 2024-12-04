
# Use a imagem oficial do SQL Server
FROM mcr.microsoft.com/mssql/server:2022-latest

USER root

# Definir a senha do SA e aceitar o EULA
ENV ACCEPT_EULA=Y
ENV SA_PASSWORD=Um2tr&45678


# Copiar o script SQL para dentro do container
COPY scriptPokemon.sql /scriptPokemon.sql

# Expor a porta 1433 do SQL Server
EXPOSE 1433

# Script para iniciar o SQL Server e rodar o script SQL
# & \
    # sleep 5 && \
    # /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P 12345678 -i /scriptPokemon.sql

# Comando para manter o SQL Server rodando em primeiro plano
CMD ["/opt/mssql/bin/sqlservr"]