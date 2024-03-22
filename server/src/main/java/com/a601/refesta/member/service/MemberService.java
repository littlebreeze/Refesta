package com.a601.refesta.member.service;

import com.a601.refesta.common.exception.CustomException;
import com.a601.refesta.common.exception.ErrorCode;
import com.a601.refesta.common.util.S3Util;
import com.a601.refesta.genre.repository.GenreRepository;
import com.a601.refesta.member.data.*;
import com.a601.refesta.member.domain.Member;
import com.a601.refesta.member.domain.join.PreferGenre;
import com.a601.refesta.member.repository.MemberRepository;
import com.a601.refesta.member.repository.PreferGenreRepository;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

import static com.a601.refesta.artist.domain.QArtist.artist;
import static com.a601.refesta.festival.domain.QFestival.festival;
import static com.a601.refesta.member.domain.QMember.member;
import static com.a601.refesta.member.domain.join.QArtistLike.artistLike;
import static com.a601.refesta.member.domain.join.QFestivalLike.festivalLike;
import static com.a601.refesta.reservation.domain.QReservation.reservation;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final PreferGenreRepository preferGenreRepository;
    private final GenreRepository genreRepository;
    private final S3Util s3Util;
    private final JPAQueryFactory jpaQueryFactory;

    public Member getMember(int memberId) {
        return memberRepository.findById(memberId).orElseThrow();
    }

    public MemberProfileRes getProfile(int memberId) {
        Member member = getMember(memberId);
        return MemberProfileRes.builder()
                .nickname(member.getNickname())
                .profileUrl(member.getProfileUrl())
                .build();
    }

    public void updateProfile(int memberId, String nickname, MultipartFile file) {
        Member member = getMember(memberId);
        member.setNickname(nickname);
        if (file != null && !file.isEmpty()) {
            member.setProfileUrl(s3Util.uploadFile(file));
        }
        memberRepository.save(member);
    }

    public void getPreferGenre(int memberId, PreferGenreReq genres) {
        Member member = getMember(memberId);
        for (Integer genreId : genres.getPreferGenres()) {
            PreferGenre preferGenre =
                    PreferGenre.builder()
                            .genre(genreRepository.findById(genreId).orElseThrow())
                            .member(member)
                            .build();
            preferGenreRepository.save(preferGenre);
        }
    }

    public List<LikeFestivalRes> getLikeFestivals(int memberId) {

        return jpaQueryFactory.select(Projections.constructor(LikeFestivalRes.class, festival.id, festival.posterUrl, festival.name, festivalLike.isLiked))
                .from(festival)
                .innerJoin(festivalLike).on(festivalLike.festival.id.eq(festival.id))
                .innerJoin(member).on(festivalLike.member.id.eq(member.id))
                .where(member.id.eq(memberId))
//                .fetchJoin()
                .fetch();
    }

    public List<LikeArtistRes> getLikeArtists(int memberId) {

        return jpaQueryFactory.select(Projections.constructor(LikeArtistRes.class, artist.id, artist.pictureUrl, artist.name, artistLike.isLiked))
                .from(artist)
                .innerJoin(artistLike).on(artistLike.artist.id.eq(artist.id))
                .innerJoin(member).on(artistLike.member.id.eq(member.id))
                .where(member.id.eq(memberId))
//                .fetchJoin()
                .fetch();
    }

    public List<ReservationRes> getReservations(int memberId) {

        return jpaQueryFactory.select(Projections.constructor(ReservationRes.class, reservation.id, festival.name, festival.date, festival.location))
                .from(festival)
                .innerJoin(reservation).on(reservation.festival.id.eq(festival.id))
                .innerJoin(member).on(reservation.member.id.eq(memberId))
                .where(member.id.eq(memberId))
                .fetch();
    }
}
