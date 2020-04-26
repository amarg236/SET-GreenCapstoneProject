package com.setgreen.repositories.noticeboard;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.setgreen.model.noticeboard.Notice;

@Repository
public interface NoticeRepo extends JpaRepository<Notice, Long>{
	
}
