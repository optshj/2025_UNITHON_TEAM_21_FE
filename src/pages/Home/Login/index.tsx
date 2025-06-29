import React, {useState} from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import {useLogin as usekakaoLogin} from '@/hook/api/useKakaoInfo';
import {useLogin, useCenterLogin} from '@/hook/api/useLogin';

import CustomModal from '@/components/layout/CustomModal';

export default function IDLogin() {
    const navigation = useNavigation() as any;
    const [isModalVisible, setModalVisible] = useState(false);
    const [modalInfo, setModalInfo] = useState({title: '', message: ''});
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const {kakaoLogin} = usekakaoLogin();
    const {loading, login} = useLogin(form);
    const {loading: centerLoading, login: centerLogin} = useCenterLogin(form);
    const handleChange = (key: string, value: string) => {
        setForm(prev => ({
            ...prev,
            [key]: value,
        }));
    };
    const showLoginResultModal = (title: string, message: string) => {
        setModalInfo({title, message});
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    return (
        <View className="flex flex-col gap-12 p-5 h-full">
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <EvilIcons size={32} name="close" color="#484848" />
            </TouchableOpacity>
            <View className="flex justify-center items-center">
                <Image className="w-32 h-12" source={require('@/assets/logo.png')} />
                <Text className="text-2xl font-semibold tracking-[-2px] text-font-black">나눔의 일상을 만나다</Text>
            </View>

            <View className="flex px-5">
                <TextInput
                    className="p-3 text-base rounded-t-lg border border-gray-300"
                    placeholder="이메일을 입력해 주세요"
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                    value={form.email}
                    onChangeText={text => handleChange('email', text)}
                    editable={!loading}
                />
                <TextInput
                    className="p-3 mb-4 text-base rounded-b-lg border border-t-0 border-gray-300"
                    placeholder="비밀번호를 입력해 주세요"
                    secureTextEntry
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={form.password}
                    onChangeText={text => handleChange('password', text)}
                    editable={!loading}
                />
                <TouchableOpacity
                    className={`flex items-center justify-center mb-4 py-3.5 rounded-lg ${loading ? 'bg-main-gray' : 'bg-main-color'}`}
                    onPress={() => login(showLoginResultModal)}
                    disabled={loading}>
                    <Text className="text-base font-semibold text-white">{loading ? '로그인 중...' : '개인 로그인'}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className={`flex items-center justify-center mb-4 py-3.5 rounded-lg ${centerLoading ? 'bg-main-gray' : 'bg-font-black'}`}
                    onPress={() => centerLogin(showLoginResultModal)}
                    disabled={loading}>
                    <Text className="text-base font-semibold text-white">{centerLoading ? '로그인 중...' : '센터 로그인'}</Text>
                </TouchableOpacity>
                <View className="flex flex-row items-center my-4">
                    <View className="flex-1 h-px bg-main-gray" />
                    <Text className="px-4 font-semibold text-main-gray">간편로그인</Text>
                    <View className="flex-1 h-px bg-main-gray" />
                </View>
                <View className="flex items-center mb-4">
                    <TouchableOpacity onPress={kakaoLogin} className="flex justify-center items-center py-4 w-10 h-10 bg-yellow-300 rounded-full">
                        <Image source={require('@/assets/kakao.png')} className="w-5 h-5" resizeMode="contain" />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    className="flex items-center justify-center py-3.5 mt-4 border border-main-gray rounded-lg"
                    onPress={() => navigation.navigate('signup')}>
                    <Text className="font-bold text-main-color">회원가입</Text>
                </TouchableOpacity>
            </View>

            <CustomModal visible={isModalVisible} onClose={handleCloseModal} title={modalInfo.title} action="none">
                <View className="items-center w-full">
                    <Text className="my-4 text-center text-font-gray">{modalInfo.message}</Text>
                    <TouchableOpacity className="justify-center items-center py-3 mt-2 w-full rounded-lg bg-main-color" onPress={handleCloseModal}>
                        <Text className="font-bold text-white">확인</Text>
                    </TouchableOpacity>
                </View>
            </CustomModal>
        </View>
    );
}
