package com.setgreen.services.usergroups;

import com.setgreen.model.Game;

import lombok.Data;

@Data
public class GameConflictObj {
	private int conflictCount;
	private String conflicts;
	public GameConflictObj(){
		conflictCount = 0;
		conflicts = "";
	}
	public GameConflictObj(int startCount, String startText) {
		conflictCount = startCount;
		conflicts = startText;
	}
	public void addTimeConflict(Game g) {
		this.conflictCount = this.conflictCount+1;
		this.conflicts = this.conflicts + "\n" + g.getHometeam() + " vs. " + g.getAwayteam() + " at " + g.getLocation();  //nextline hometeam vs awayteam at location
	}
	public String display() {
		this.conflicts = this.conflictCount + " conflicts found:" + this.conflicts; //"X conflicts found:\n hometeam vs. awayteam at location\n..."
		return this.conflicts;
	}
	
	public boolean didConflict() {
		if(this.conflictCount > 0) {
			return true;
		}
		return false;
	}
}
