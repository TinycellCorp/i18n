import * as i18n from './LanguageData';
import { _decorator, Component, sp } from 'cc';
const { ccclass, property, executeInEditMode } = _decorator;

@ccclass('LocalizedSkeletonAnimationItem')
class LocalizedSkeletonAnimationItem {
    @property
    language: string = 'zh';

    @property
    animation: string = 'zh';

}

@ccclass('LocalizedSkeletonAnimation')
@executeInEditMode
export class LocalizedSkeletonAnimation extends Component {
    skeleton: sp.Skeleton | null = null;

    @property({
        type: LocalizedSkeletonAnimationItem,
    })
    list = [];

    onLoad() {
        if (!i18n.ready) {
            i18n.init(i18n._language);
        }
        this.fetchRender();
    }

    fetchRender() {
        if (this.skeleton) { return; }
        let skeleton = this.getComponent(sp.Skeleton);
        if (skeleton) {
            this.skeleton = skeleton;
            this.updateSkeleton();
            return;
        }
    }

    updateSkeleton() {
        this.fetchRender();
        for (let i = 0; i < this.list.length; i++) {
            const item = this.list[i] as LocalizedSkeletonAnimationItem;
            // @ts-ignore
            if (item.language === i18n._language) {
                // @ts-ignore
                const was = {
                    loop: this.skeleton.loop,
                    animation: item.animation,
                };
                this.skeleton.setAnimation(0, item.animation, was.loop);
                break;
            }
        }
    }
}


