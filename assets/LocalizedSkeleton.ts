import * as i18n from './LanguageData';
import { _decorator, Component, sp } from 'cc';
const { ccclass, property, executeInEditMode } = _decorator;

@ccclass('LocalizedSkeletonItem')
class LocalizedSkeletonItem {
    @property
    language: string = 'zh';

    @property({
        type: sp.SkeletonData,
    })
    data: sp.SkeletonData | null = null;

    @property
    fallback: string = '';
}

@ccclass('LocalizedSkeleton')
@executeInEditMode
export class LocalizedSkeleton extends Component {
    skeleton: sp.Skeleton | null = null;

    @property({
        type: LocalizedSkeletonItem,
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
            const item = this.list[i];
            // @ts-ignore
            if (item.language === i18n._language) {
                // @ts-ignore
                const was = {
                    loop: this.skeleton.loop,
                    animation: this.skeleton.animation || item.fallback,
                };
                this.skeleton.skeletonData = item.data;
                this.skeleton.loop = was.loop;
                this.skeleton.animation = was.animation;
                break;
            }
        }
    }
}


