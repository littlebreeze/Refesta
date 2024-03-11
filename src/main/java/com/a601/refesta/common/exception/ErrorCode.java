package com.a601.refesta.common.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {

    USER_NOT_FOUND_ERROR(404, "USR001", "존재하지 않는 사용자입니다.");

    private final int status;

    private final String code;

    private final String message;
}
