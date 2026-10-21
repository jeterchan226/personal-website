// Interface strings (navigation, buttons, labels). Content text lives in src/content instead.
import { LANGS } from '../lib/content/validate';

export { LANGS };
export type Lang = (typeof LANGS)[number];

export const LANG_LABEL: Record<Lang, string> = {
  'zh-tw': '中文',
  en: 'English',
};

// Value of the <html lang> attribute.
export const HTML_LANG: Record<Lang, string> = {
  'zh-tw': 'zh-Hant-TW',
  en: 'en',
};

const ui = {
  'zh-tw': {
    'nav.home': '首頁',
    'nav.projects': '專案',
    'nav.about': '關於我',
    'nav.contact': '聯絡',
    'theme.toggle': '切換深淺色',
    'home.services': '我能提供的服務',
    'home.featured': '精選專案',
    'home.allProjects': '查看所有專案',
    'home.cta.title': '有合作或職缺想聊聊?',
    'home.cta.button': '聯絡我',
    'projects.title': '專案',
    'projects.description': '過往參與與獨立開發的專案。',
    'projects.filter.all': '全部',
    'project.role': '角色',
    'project.period': '期間',
    'project.tech': '技術',
    'project.outcomes': '成果',
    'project.experience': '任職',
    'project.confidential': '保密專案',
    'project.client': '客戶',
    'project.clientSuffix': '客戶',
    'project.github': '原始碼',
    'project.demo': 'Demo',
    'project.back': '回到所有專案',
    'about.title': '關於我',
    'about.experience': '經歷',
    'about.resume': '下載履歷 (PDF)',
    'contact.title': '聯絡我',
    'contact.description': '求職邀約、合作詢問,都歡迎來信。',
    'contact.name': '姓名',
    'contact.email': 'Email',
    'contact.type': '類型',
    'contact.type.job': '求職邀約',
    'contact.type.collab': '合作詢問',
    'contact.type.other': '其他',
    'contact.message': '訊息',
    'contact.submit': '送出',
    'contact.elsewhere': '或透過以下管道',
    'thanks.title': '已收到你的訊息',
    'thanks.body': '謝謝你的來信,我會盡快回覆。',
    'thanks.back': '回到首頁',
    'notFound.title': '找不到這個頁面',
    'period.present': '至今',
  },
  en: {
    'nav.home': 'Home',
    'nav.projects': 'Projects',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'theme.toggle': 'Toggle dark mode',
    'home.services': 'What I can do for you',
    'home.featured': 'Featured projects',
    'home.allProjects': 'See all projects',
    'home.cta.title': 'Have a role or project in mind?',
    'home.cta.button': 'Get in touch',
    'projects.title': 'Projects',
    'projects.description': 'Work I have shipped at companies and on my own.',
    'projects.filter.all': 'All',
    'project.role': 'Role',
    'project.period': 'Period',
    'project.tech': 'Tech',
    'project.outcomes': 'Outcomes',
    'project.experience': 'At',
    'project.confidential': 'Confidential',
    'project.client': 'Client',
    'project.clientSuffix': 'client',
    'project.github': 'Source',
    'project.demo': 'Demo',
    'project.back': 'Back to all projects',
    'about.title': 'About',
    'about.experience': 'Experience',
    'about.resume': 'Download résumé (PDF)',
    'contact.title': 'Contact',
    'contact.description': 'Job opportunities or project inquiries — I would love to hear from you.',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.type': 'Type',
    'contact.type.job': 'Job opportunity',
    'contact.type.collab': 'Project inquiry',
    'contact.type.other': 'Other',
    'contact.message': 'Message',
    'contact.submit': 'Send',
    'contact.elsewhere': 'Or reach me at',
    'thanks.title': 'Message received',
    'thanks.body': 'Thanks for reaching out. I will get back to you soon.',
    'thanks.back': 'Back to home',
    'notFound.title': 'Page not found',
    'period.present': 'Present',
  },
} as const satisfies Record<Lang, Record<string, string>>;

export type UiKey = keyof (typeof ui)['zh-tw'];

export function t(lang: Lang, key: UiKey): string {
  return ui[lang][key];
}

export function isLang(value: string | undefined): value is Lang {
  return (LANGS as readonly string[]).includes(value ?? '');
}
