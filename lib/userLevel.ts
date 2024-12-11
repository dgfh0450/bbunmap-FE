export function calculateLevel(totalVote: number | undefined): [number, number] {
    if (!totalVote) return [maxUserLevel, 0];

    let index = 0;

    for (index = 0; index < maxUserLevel; index++) {
        if (totalVote >= levelIntervals[index]) {
            break;
        }
    }

    const level = maxUserLevel - index;
    const remain = (level === maxUserLevel) ? -1 : levelIntervals[index - 1] - totalVote;


    return [level, remain]
}

export const levelIntervals = [70, 45, 20, 2, -1];
export const levelTexts = ['', '아직 너무 조그매 ...', '투표하고 쑥쑥 크는 중!', '저도 투표할래요~!', '공부 중 ...', '이제 다 컸어요!']
export const maxUserLevel = levelIntervals.length;