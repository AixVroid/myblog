/**
 * 名片内容都在这里改：换照片只改 avatar 一行，换名字只改 name 一行。
 */
export interface CardLink {
  /** 主标签（中文），locked 时直接显示 UNLOCKED */
  label: string;
  /** 副标签（英文，小字大写） */
  en: string;
  /** 跳转地址；locked 的格子可以不填 */
  href?: string;
  /** 外链会加 ↗ 并在新标签打开 */
  external?: boolean;
  /**
   * 锁定占位：显示 UNLOCKED，不可点击。
   * 后期想启用，把 locked 去掉、补上 href 即可，模板不用动。
   */
  locked?: boolean;
}

/** 锁定格子的统一文案，想换说法改这里 */
export const LOCKED_LABEL = 'UNLOCKED';

export const cardData = {
  /** 头像路径：图片放 public/card/ 下，这里写 /card/xxx 即可 */
  avatar: '/card/avatar.png',
  avatarAlt: 'AixVroid 的头像',

  /** 姓名：卡片上唯一的大字 */
  name: 'AixVroid',

  /** 卡片编号，显示在底纹条右侧，纯装饰 */
  id: 'AXV-2026-0001',

  /**
   * 下方跳转格。数组顺序 = 填充顺序，具体排版由 CardNav.astro 决定。
   * 启用一个锁定格子：把 locked 删掉，填上 href。
   */
  links: [
    { label: '文章', en: 'ARTICLES', href: '/blog' },
    { label: '标签', en: 'TAGS', href: '/tags' },
    { label: '项目', en: 'WORKS', href: '/works' },
    { label: LOCKED_LABEL, en: 'SLOT 04', locked: true },
    { label: LOCKED_LABEL, en: 'SLOT 05', locked: true },
    { label: LOCKED_LABEL, en: 'SLOT 06', locked: true },
  ] satisfies CardLink[],
};
