package com.setgreen.setgreen.security;

public class SecurityConstants {
    public static final String SECRET = "SecretKeyToGenJWT";
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final long EXPIRATION_TIME = 3600_000; //1 hour seconds

}
