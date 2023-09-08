# Building .NET container image:
# 
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /source

# copy csproj and restore as distinct layers
COPY ./WebApp/*.csproj .
RUN dotnet restore --use-current-runtime  

# copy everything else and build app
COPY ./WebApp/. .
RUN dotnet publish --use-current-runtime --self-contained false --no-restore -o /app

# final stage/image
FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /app
COPY --from=build /app .

# This port needs to match the port being used
HEALTHCHECK CMD wget -qO- -t1 http://localhost:8080/healthz || exit 1
ENTRYPOINT ["dotnet", "WebApp.dll"]
