package com.setgreen.setgreen.model;

import com.setgreen.setgreen.services.usergroups.UserAdmin;
import com.setgreen.setgreen.services.usergroups.UserAssigner;
import com.setgreen.setgreen.services.usergroups.UserReference;
import com.setgreen.setgreen.services.usergroups.UserScheduler;
import com.setgreen.setgreen.services.usergroups.UserUnfound;

public enum RoleName {
    ADMIN{ //System controllers
    	@Override
    	public UserAdmin build() {
    		return new UserAdmin();
    	}

		@Override
		public int userLevel() {
			return 12000; //the levels I assigned may seem random, but gives growth potential.
		}
    },
    ASSIGNER{ //Assigners
    	@Override
    	public UserAssigner build() {
    		return new UserAssigner();
    	}

		@Override
		public int userLevel() {
			return 8000;
		}
    },
    USER{ //Schedulers
    	@Override
    	public UserScheduler build() {
    		return new UserScheduler();
    	}

		@Override
		public int userLevel() {
			return 4000;
		}
    },
    UNFOUND{ //When we can't find the role, lock it up and out.
    	@Override
    	public UserUnfound build() {
    		return new UserUnfound();
    	}
    	@Override
    	public int userLevel() {
    		return -1;
    	}
    };
	public abstract UserReference build(); //Creates a class object representing this access level (we assume would be) implementing UserReference
	public abstract int userLevel(); //is a "clearance level" for user. Used for "less than" or "greater than" compares. This does mean that "sidegrade" roles may be a bit odd to implement.
}
