import React from 'react';
import classNames from 'classnames';
import './Badge.scss';

export const Badge = (props) => {
    return (
        <div>
            {props.colors.map(color =>
                <button
                    className={classNames(`theme_${color.name}`, { [`activeTheme_${color.name}`]: props.badgeSelectedColor === color.name })}
                    area-label={`${color.name} Theme`}
                    onClick={() => props.setBadgeColor(color.id)} ></button>)
            }
        </div >
    )
}

export default Badge;
