package com.setgreen.setgreen.services;

import com.setgreen.setgreen.model.Game;

import java.util.List;

public interface GameService {
    void createGame(Game game);
    List<Game> viewGame();
}
