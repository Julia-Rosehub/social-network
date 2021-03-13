import React from 'react';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import userPhoto from '../../../assets/images/user.png';
import { Link } from 'react-router-dom';
import Preloader from '../../common/Preloader';

import s from './ProfileInfo.module.css';

const ProfileInfo = (props) => {

    if (!props.profile) {
        return <Preloader />
    }

    return (
        <>
            <div className={s.profileInfo}>
                <div className={s.descriptionBlock}>
                    <img src={'https://i1.adis.ws/i/canon/canon-get-inspired-city-break-1-40-percent-tint-1920?qlt=80&w=100%&sm=aspect&aspect=16:9&fmt=jpg&fmt.options=interlaced&bg=rgb(255,255,255)'} />
                </div>
                <div className={s.profileStatusWithFoto}>
                    <img className={s.profilePhoto} src={props.profile.photos.large || userPhoto} />
                    <ProfileStatusWithHooks status={props.status} updateUserStatus={props.updateUserStatus} />
                </div>

                <div className={s.profileFullName}>
                    <h2> {props.profile.fullName} <br /> {props.profile.aboutMe}</h2>
                </div>
                <div className={s.descriptionBlock__job}>{props.profile.lookingForAJob
                    ? <img src='https://media.karousell.com/media/photos/products/2018/11/03/looking_for_a_job_1541252456_434d2e68_progressive.jpg' />
                    : <img src='https://i.pinimg.com/originals/da/3d/cb/da3dcbc1a5882f149e99a94df6d147ce.jpg' />
                }
                </div>
                {!Object.values(props.profile.contacts).every(i => i === null) && <div className={s.profileContacts}>Me in social networks:
                {props.profile.contacts.website ? <div> website:{props.profile.contacts.website}</div> : ''}
                    {props.profile.contacts.vk ? <div>vk: <Link to={props.profile.contacts.vk}>{props.profile.contacts.vk}</Link></div> : ''}
                    {props.profile.contacts.twitter ? <div>twitter: {props.profile.contacts.twitter}</div> : ''}
                    {props.profile.contacts.instagram ? <div>instagram: {props.profile.contacts.instagram}</div> : ''}
                    {props.profile.contacts.youtube ? <div>youtube: {props.profile.contacts.youtube}</div> : ''}
                    {props.profile.contacts.github ? <div>github: {props.profile.contacts.github}</div> : ''}
                </div>
                }
            </div>


        </>
    )
}

export default ProfileInfo;