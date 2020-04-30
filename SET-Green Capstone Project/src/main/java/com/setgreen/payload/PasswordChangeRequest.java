package com.setgreen.payload;

import javax.validation.constraints.NotBlank;

import lombok.Data;

@Data
public class PasswordChangeRequest {
    @NotBlank(message = "newPassword cannot be blank")
    private String newPassword;

    @NotBlank(message = "accessKey can not be blank")
    private String accessKey;
}
