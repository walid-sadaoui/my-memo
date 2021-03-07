import classNames from "classnames";
import React, { FunctionComponent, SVGProps } from "react";
import { ReactComponent as Bookmark } from "../../assets/images/bookmark.svg";
import { ReactComponent as Check } from "../../assets/images/check.svg";
import { ReactComponent as Cog } from "../../assets/images/cog.svg";
import { ReactComponent as Download } from "../../assets/images/download.svg";
import { ReactComponent as Exclamation } from "../../assets/images/exclamation.svg";
import { ReactComponent as Flag } from "../../assets/images/flag.svg";
import { ReactComponent as Menu } from "../../assets/images/menu.svg";
import { ReactComponent as PencilAlt } from "../../assets/images/pencil-alt.svg";
import { ReactComponent as Pencil } from "../../assets/images/pencil.svg";
import { ReactComponent as Plus } from "../../assets/images/plus.svg";
import { ReactComponent as Trash } from "../../assets/images/trash.svg";
import { ReactComponent as UserCircle } from "../../assets/images/user-circle.svg";
import { ReactComponent as X } from "../../assets/images/x.svg";

enum IconName {
  BOOKMARK = "bookmark",
  CHECK = "check",
  COG = "cog",
  DOWNLOAD = "download",
  EXCLAMATION = "exclamation",
  FLAG = "flag",
  MENU = "menu",
  PENCIL_ALT = "pencilAlt",
  PENCIL = "pencil",
  PLUS = "plus",
  TRASH = "trash",
  USER_CIRCLE = "userCircle",
  X = "x",
}

enum IconSize {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
}

const IconComponent: Record<
  string,
  FunctionComponent<SVGProps<SVGSVGElement>>
> = {
  [IconName.BOOKMARK]: Bookmark,
  [IconName.CHECK]: Check,
  [IconName.COG]: Cog,
  [IconName.DOWNLOAD]: Download,
  [IconName.EXCLAMATION]: Exclamation,
  [IconName.FLAG]: Flag,
  [IconName.MENU]: Menu,
  [IconName.PENCIL]: Pencil,
  [IconName.PENCIL_ALT]: PencilAlt,
  [IconName.PLUS]: Plus,
  [IconName.TRASH]: Trash,
  [IconName.USER_CIRCLE]: UserCircle,
  [IconName.X]: X,
};

interface IconProps {
  icon: string;
  className?: string;
  size?: string;
}

const Icon: FunctionComponent<IconProps> = ({ icon, size }) => {
  const Svg = IconComponent[icon];

  return Svg ? (
    <Svg
      className={classNames(
        size === IconSize.SMALL && "w-4 h-4",
        size === IconSize.MEDIUM && "w-6 h-6",
        size === IconSize.LARGE && "w-8 h-8"
      )}
    />
  ) : null;
};

export default Icon;
