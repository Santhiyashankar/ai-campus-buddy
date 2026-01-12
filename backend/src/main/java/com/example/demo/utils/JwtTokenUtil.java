package com.example.demo.utils;

import java.security.Key;
import java.util.Date;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;

public class JwtTokenUtil {

    // ✅ Must be at least 32 chars for HS256
    private static final String SECRET =
            "campus-buddy-authentication-secret-key-123456789";

    // ✅ 5 hours validity
    private static final long EXPIRATION = 1000 * 60 * 60 * 5;

    private static Key getSigningKey() {
        return Keys.hmacShaKeyFor(SECRET.getBytes());
    }

    // ✅ Generate JWT
    public static String generateToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    // ✅ Extract email safely
    public static String extractEmail(String token) {
        token = stripBearer(token);

        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .setAllowedClockSkewSeconds(60) // ✅ FIX: allow 1 min skew
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    // ✅ Validate JWT properly
    public static boolean validateToken(String token) {
        try {
            token = stripBearer(token);

            Jwts.parserBuilder()
                    .setSigningKey(getSigningKey())
                    .setAllowedClockSkewSeconds(60) // ✅ FIX
                    .build()
                    .parseClaimsJws(token);

            return true;

        } catch (ExpiredJwtException e) {
            System.out.println("JWT expired: " + e.getMessage());
        } catch (UnsupportedJwtException e) {
            System.out.println("JWT unsupported: " + e.getMessage());
        } catch (MalformedJwtException e) {
            System.out.println("JWT malformed: " + e.getMessage());
        } catch (SignatureException e) {
            System.out.println("JWT signature invalid: " + e.getMessage());
        } catch (IllegalArgumentException e) {
            System.out.println("JWT empty or null");
        }

        return false;
    }

    // ✅ Remove "Bearer " if present
    private static String stripBearer(String token) {
        if (token != null && token.startsWith("Bearer ")) {
            return token.substring(7);
        }
        return token;
    }
}
