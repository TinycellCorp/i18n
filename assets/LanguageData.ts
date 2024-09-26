import { director } from 'cc';

export let _language = 'zh';

export let ready: boolean = false;

/**
 * 初始化
 * @param language 
 */
export function init(language: string) {
    ready = true;
    _language = language;
}

/**
 * 翻译数据
 * @param key 
 */
export function t(key: string) {
    const win: any = window;

    if (!win.languages) {
        return key;
    }
    const searcher = key.split('.');

    let data = win.languages[_language];
    for (let i = 0; i < searcher.length; i++) {
        data = data[searcher[i]];
        if (!data) {
            return '';
        }
    }
    return data || '';
}

export function updateSceneRenderers() { // very costly iterations
    const rootNodes = director.getScene()!.children;
    // walk all nodes with localize label and update
    const allLocalizedLabels: any[] = [];
    for (let i = 0; i < rootNodes.length; ++i) {
        let labels = rootNodes[i].getComponentsInChildren('LocalizedLabel');
        Array.prototype.push.apply(allLocalizedLabels, labels);
    }
    for (let i = 0; i < allLocalizedLabels.length; ++i) {
        let label = allLocalizedLabels[i];
        if (!label.node.active) continue;
        label.updateLabel();
    }

    // fonts
    const allLocalizedFonts: any[] = [];
    for (let i = 0; i < rootNodes.length; ++i) {
        let labels = rootNodes[i].getComponentsInChildren('LocalizedFont');
        Array.prototype.push.apply(allLocalizedFonts, labels);
    }
    for (let i = 0; i < allLocalizedFonts.length; ++i) {
        let label = allLocalizedFonts[i];
        if (!label.node.active) continue;
        label.updateFont();
    }

    // rich fonts
    const allLocalizedRichFonts: any[] = [];
    for (let i = 0; i < rootNodes.length; ++i) {
        let labels = rootNodes[i].getComponentsInChildren('LocalizedRichFont');
        Array.prototype.push.apply(allLocalizedRichFonts, labels);
    }
    for (let i = 0; i < allLocalizedRichFonts.length; ++i) {
        let label = allLocalizedRichFonts[i];
        if (!label.node.active) continue;
        label.updateFont();
    }

    // spine skeletons
    const allLocalizedSkeletons: any[] = [];
    for (let i = 0; i < rootNodes.length; ++i) {
        let skeletons = rootNodes[i].getComponentsInChildren('LocalizedSkeleton');
        Array.prototype.push.apply(allLocalizedSkeletons, skeletons);
    }
    for (let i = 0; i < allLocalizedSkeletons.length; ++i) {
        let skeleton = allLocalizedSkeletons[i];
        if (!skeleton.node.active) continue;
        skeleton.updateSkeleton();
    }

    // spine skeleton animations
    const allLocalizedSkeletonAnimations: any[] = [];
    for (let i = 0; i < rootNodes.length; ++i) {
        let skeletons = rootNodes[i].getComponentsInChildren('LocalizedSkeletonAnimation');
        Array.prototype.push.apply(allLocalizedSkeletonAnimations, skeletons);
    }
    for (let i = 0; i < allLocalizedSkeletonAnimations.length; ++i) {
        let skeleton = allLocalizedSkeletonAnimations[i];
        if (!skeleton.node.active) continue;
        skeleton.updateSkeleton();
    }

    // walk all nodes with localize sprite and update
    const allLocalizedSprites: any[] = [];
    for (let i = 0; i < rootNodes.length; ++i) {
        let sprites = rootNodes[i].getComponentsInChildren('LocalizedSprite');
        Array.prototype.push.apply(allLocalizedSprites, sprites);
    }
    for (let i = 0; i < allLocalizedSprites.length; ++i) {
        let sprite = allLocalizedSprites[i];
        if (!sprite.node.active) continue;
        sprite.updateSprite();
    }
}

// 供插件查询当前语言使用
const win = window as any;
win._languageData = {
    get language() {
        return _language;
    },
    init(lang: string) {
        init(lang);
    },
    updateSceneRenderers() {
        updateSceneRenderers();
    },
};
