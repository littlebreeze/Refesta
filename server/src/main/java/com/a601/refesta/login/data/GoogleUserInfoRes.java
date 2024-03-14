package com.a601.refesta.login.data;

import lombok.Data;

@Data
public class GoogleUserInfoRes {
    private String id;  //구글 식별 id
    private String email;
    private String name;    //구글 닉네임(이름)
    private String picture;    //프로필사진
}
