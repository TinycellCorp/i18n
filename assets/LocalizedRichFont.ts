import * as i18n from './LanguageData';
import { _decorator, Component, Font, RichText } from 'cc';
const { ccclass, property, executeInEditMode } = _decorator;

@ccclass('LocalizedRichFontItem')
class LocalizedRichFontItem {
    @property
    language: string = 'zh';
    @property({
        type: Font,
    })
    font: Font | null = null;
}

@ccclass('LocalizedRichFont')
@executeInEditMode
export class LocalizedRichFont extends Component {
    text: RichText | null = null;

    @property({
        type: LocalizedRichFontItem,
    })
    list = [];

    onLoad() {
        if (!i18n.ready) {
            i18n.init(i18n._language);
        }
        this.fetchRender();
    }

    fetchRender() {
        if (this.text) { return; }
        let label = this.getComponent(RichText);
        if (label) {
            this.text = label;
            this.updateFont();
            return;
        }
    }

    updateFont() {
        this.fetchRender();
        for (let i = 0; i < this.list.length; i++) {
            const item = this.list[i];
            // @ts-ignore
            if (item.language === i18n._language) {
                // @ts-ignore
                this.text.font = item.font;
                break;
            }
        }
    }
}


