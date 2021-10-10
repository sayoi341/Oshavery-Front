import React, { useContext } from "react";
import type { FC } from "react";

import { useRouter } from "next/router";
import ChannelCard from "../atoms/ChannelCard";
import NameCard from "../atoms/NameCard";

import { Guild } from "../../types/guild";
import { userContext } from "../../stores/user";

import style from "../../styles/app_components/organisms/ChannelList.module.scss";

const ChannelList: FC = () => {
  const { userState } = useContext(userContext);
  const { guildID, channelID } = useRouter().query;

  const stringGuildID = guildID as string;
  const nowGuild: Guild = userState.user.guilds[userState.user.guilds.findIndex((item) => item.id === guildID)];

  return (
    <div className={style.channellist}>
      <div className={style.guildname}>
        <NameCard name={nowGuild.name} />
      </div>
      <div className={style.channels}>
        {nowGuild.channels.map((value) => (
            <ChannelCard
              key={value.id}
              channel_name={value.name}
              channel_topics={value.topics}
              channel_type={value.type}
              link={`/guild/${stringGuildID}/channel/${value.id}`}
              selected={value.id === channelID}
            />
          ))}
      </div>
    </div>
  );
};

export default React.memo(ChannelList);
