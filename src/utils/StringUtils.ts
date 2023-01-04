export function formatString(template: string, ...args: any[]) {
    let i = args.length;

    while (i--) {
        template = template.replace(new RegExp('\\{' + i + '\\}', 'gm'), args[i].toString());
    }
    return template;
};