package com.setgreen.setgreen.model;

public enum RoleName {
    ADMIN{ //System controllers
		@Override
		public int userLevel() {
			return 12000; //the levels I assigned may seem random, but gives growth potential.
		}
    },
    ASSIGNER{ //Assigners

		@Override
		public int userLevel() {
			return 8000;
		}
    },
    USER{ //Schedulers
		@Override
		public int userLevel() {
			return 4000;
		}
    },
    UNFOUND{ //When we can't find the role, lock it up and out.
    	@Override
    	public int userLevel() {
    		return -1;
    	}
    };
	public abstract int userLevel(); //is a "clearance level" for user. Used for "less than" or "greater than" compares. This does mean that "sidegrade" roles may be a bit odd to implement.
}
