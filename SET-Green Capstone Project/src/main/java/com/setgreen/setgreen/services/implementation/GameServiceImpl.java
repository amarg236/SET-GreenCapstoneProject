package com.setgreen.setgreen.services.implementation;

import com.setgreen.setgreen.model.Game;
import com.setgreen.setgreen.repositories.GameRepo;
import com.setgreen.setgreen.services.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GameServiceImpl implements GameService {

    @Autowired
    private  GameRepo gameRepo;

    @Override
    public void createGame(Game cgame) {
        gameRepo.save(cgame);
    }

    @Override
    public List<Game> viewGame() {
        return gameRepo.findAll();
    }
}
