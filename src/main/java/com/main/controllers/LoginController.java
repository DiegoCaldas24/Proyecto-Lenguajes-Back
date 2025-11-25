package com.main.controllers;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/login")
public class LoginController {
    @GetMapping
    public String login() {
        return "login";
    }

    @PostMapping
    public String loginPost(Authentication authentication) {
        String rol = authentication.getAuthorities().iterator().next().getAuthority();
        return switch (rol) {
            case "ROLE_ADMINISTRADOR" -> "redirect:/dashboard";
            case "ROLE_TRABAJADOR" -> "redirect:/dashboard";
            case "ROLE_USUARIO" -> "redirect:/dashboard";
            default -> "redirect:/login";
        };
    }
}
