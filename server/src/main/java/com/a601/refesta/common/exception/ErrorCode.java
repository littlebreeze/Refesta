package com.a601.refesta.common.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {

    //User
    USER_NOT_FOUND_ERROR(404, "USR001", "존재하지 않는 사용자입니다."),

    //Festival
    FESTIVAL_NOT_FOUND_ERROR(404, "FES001", "존재하지 않는 페스티벌입니다."),
    FESTIVAL_DETAIL_NOT_FOUND_ERROR(500, "FES002", "예정된 페스티벌의 상세 정보가 존재하지 않습니다.");

    private final int status;

    private final String code;

    private final String message;
}
