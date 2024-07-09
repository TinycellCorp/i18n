import * as i18n from './LanguageData';
import { _decorator, Component, Font, Label, Node } from 'cc';
const { ccclass, property, executeInEditMode } = _decorator;

@ccclass('LocalizedFontItem')
class LocalizedFontItem {
    @property
    language: string = 'zh';
    @property({
        type: Font,
    })
    font: Font | null = null;
}

@ccclass('LocalizedFont')
@executeInEditMode
export class LocalizedFont extends Component {
    label: Label | null = null;

    @property({
        type: LocalizedFontItem,
    })
    spriteList = [];

    onLoad() {
        if (!i18n.ready) {
            i18n.init(i18n._language);
        }
        this.fetchRender();
    }

    fetchRender() {
        if(this.label) { return; }
        let label = this.getComponent('cc.Label') as Label;
        if (label) {
            this.label = label;
            this.updateFont();
            return;
        }
    }

    updateFont() {
        this.fetchRender();
        for (let i = 0; i < this.spriteList.length; i++) {
            const item = this.spriteList[i];
            // @ts-ignore
            if (item.language === i18n._language) {
                // @ts-ignore
                this.label.font = item.font;
                break;
            }
        }
    }
}


