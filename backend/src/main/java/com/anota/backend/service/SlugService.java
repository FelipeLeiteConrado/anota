package com.anota.backend.service;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
public class SlugService {

    private static final List<String> ADJETIVOS = List.of(
            "cafe", "antigo", "calmo", "claro", "doce",
            "fundo", "lento", "leve", "livre", "longo",
            "macio", "manso", "morno", "novo", "pleno",
            "puro", "quente", "rico", "seco", "sereno",
            "simples", "suave", "tranquilo", "unico", "velho",
            "verde", "vivo", "azul", "belo", "breve"
    );

    private static final List<String> SUBSTANTIVOS = List.of(
            "caderno", "canto", "carta", "chuva", "cidade",
            "folha", "jardim", "lago", "livro", "lua",
            "mapa", "mesa", "monte", "nuvem", "pagina",
            "papel", "pedra", "pena", "pinho", "ponte",
            "porto", "praia", "rio", "rosa", "rumo",
            "sombra", "terra", "texto", "tinta", "vento"
    );

    private final Random random = new Random();

    public String generate() {
        String adjetivo = ADJETIVOS.get(random.nextInt(ADJETIVOS.size()));
        String substantivo = SUBSTANTIVOS.get(random.nextInt(SUBSTANTIVOS.size()));
        int numero = random.nextInt(90) + 10;
        return adjetivo + "-" + substantivo + "-" + numero;
    }
}