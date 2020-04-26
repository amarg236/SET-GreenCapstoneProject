package com.setgreen.model;

/** 
 * This is just a place to unify all the different roles in 1 place.
 * Originally it was supposed to be a factory for instances of the role class but that caused issues
 * so now it's just a way to make sure we unify the role names.
 */
public enum RoleName {
    ADMIN{ //System controllers
		@Override
		public int userLevel() {
			return 12000;
		}
		@Override
		public boolean hasDistrict() {
			return false;
		}
    },
    ASSIGNER{ //Assigners 
		@Override
		public int userLevel() {
			return 8000;
		}
		@Override
		public boolean hasDistrict() {
			return false;
		}
    },
    USER{ //Schedulers
		@Override
		public int userLevel() {
			return 4000;
		}
		@Override
		public boolean hasDistrict() {
			return true;
		}
    },
    UNFOUND{ //When we can't find the role, lock it up and out.
    	@Override
    	public int userLevel() {
    		return -1;
    	}
    	@Override
		public boolean hasDistrict() {
			return false;
		}
    };
	public abstract int userLevel(); //is a "clearance level" for user. Used for "less than" or "greater than" compares. This does mean that "sidegrade" roles may be a bit odd to implement.

	public abstract boolean hasDistrict(); //says if the given role is universal across all districts/is expected to have a defined district.
}
