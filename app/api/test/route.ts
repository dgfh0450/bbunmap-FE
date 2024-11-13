import { NextRequest, NextResponse } from "next/server";

const list: { building: string, place: string }[] = [
    { building: '과학도서관', place: 'alpha 라운지' },
    { building: '과학도서관', place: 'beta 라운지' },
    { building: '과학도서관', place: 'gamma 라운지' },
    { building: '과학도서관', place: 'delta 라운지' },
    { building: '과학도서관', place: '1층 열람실' },
]

export async function GET(req: NextRequest, res: NextResponse) {
    console.log('get')
    const result = list.map(item => ({
        ...item,
        value: Math.floor(Math.random() * 100) // 0부터 99까지의 랜덤 숫자
    }));

    return NextResponse.json(result);
}


export async function POST(req: NextRequest) {
    console.log('POST request received');

    // 요청 데이터 가져오기
    const requestData = await req.json();
    console.log(requestData);

    return NextResponse.json({ message: 'success' });
}