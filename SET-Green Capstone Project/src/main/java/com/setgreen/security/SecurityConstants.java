package com.setgreen.security;

public class SecurityConstants {
    public static final String SECRET = "SecretKeyToGenJWT";
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    //FIXME
    public static final long EXPIRATION_TIME = 2592000; //3600_000; //1 hour seconds

}
