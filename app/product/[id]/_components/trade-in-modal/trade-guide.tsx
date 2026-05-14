const TradeGuide = () => {
  return (
    <div className="mt-8 border-t border-[#d9d9d9] pt-8">
      <h3 className="mb-6 text-[18px] font-bold md:text-[20px]">
        Thu Cũ Đổi Mới Như Thế Nào?
      </h3>

      <ol className="space-y-9">
        <li className="grid grid-cols-[32px_1fr] gap-5">
          <span className="text-[24px] leading-none font-bold md:text-[28px]">
            01
          </span>
          <div className="text-[12px] leading-[1.45] md:text-[14px]">
            <p className="mb-1 font-bold">
              Cung cấp thông tin và seri hoặc IMEI1 thiết bị cũ
            </p>
            <p>Vui lòng cung cấp đầy đủ chính xác thông tin yêu cầu:</p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;Đối với thiết bị di động, mã IMEI1 từ 7-30
              kí tự và nhập mã IMEI1 đối với điện thoại sử dụng 2 SIM
            </p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;Đối với các thiết bị khác, vui lòng nhập
              số seri
            </p>
            <p>
              Mỗi số seri/IMEI1 chỉ được tham gia chương trình thu cũ đổi mới
              một lần duy nhất
            </p>
          </div>
        </li>

        <li className="grid grid-cols-[32px_1fr] gap-5">
          <span className="text-[24px] leading-none font-bold md:text-[28px]">
            02
          </span>
          <div className="text-[12px] leading-[1.45] md:text-[14px]">
            <p className="mb-1 font-bold">Kiểm tra và xác nhận thiết bị cũ</p>
            <p>Kiểm tra và xác nhận thông tin thiết bị cũ qua bảng câu hỏi.</p>
            <p>
              Đồng ý với các điều khoản và điều kiện của chương trình và tiến
              hành đặt hàng với mức chiết khấu thu cũ đổi mới đã bao gồm giá
              Samsung hỗ trợ cùng nhiều ưu đãi khác (nếu có)
            </p>
          </div>
        </li>

        <li className="grid grid-cols-[32px_1fr] gap-5">
          <span className="text-[24px] leading-none font-bold md:text-[28px]">
            03
          </span>
          <div className="text-[12px] leading-[1.45] md:text-[14px]">
            <p className="mb-1 font-bold">
              Thanh toán, nhận sản phẩm mới và bàn giao thiết bị cũ
            </p>
            <p>
              Sản phẩm mới sẽ được giao đồng thời với việc thu thiết bị cũ hợp
              lệ tại nhà
            </p>
            <p>
              Để tiết kiệm thời gian giao nhận, vui lòng chuẩn bị sẵn sàng thiết
              bị cũ bằng cách:
            </p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;Di động và thiết bị có lưu trữ dữ liệu:
              Sao lưu dữ liệu và đăng xuất tất cả tài khoản cá nhân và bảo mật
            </p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;Điện gia dụng: đảm bảo thiết bị cũ lên
              nguồn và hoạt động, có đầy đủ phụ kiện (dây nguồn, remote,...)
            </p>
          </div>
        </li>
      </ol>

      <div className="mt-9 space-y-5 text-[12px] leading-[1.45] font-bold md:text-[14px]">
        <p className="whitespace-break-spaces">
          Lưu ý: Khách hàng vui lòng mang theo CCCD để điền thông tin cá nhân và
          đối chiếu trên hợp đồng mua bán thiết bị cũ. Thông tin CCCD trên hợp
          đồng và người ký phải trùng khớp với nhau, nếu khách hàng không đồng ý
          cung cấp thông tin để ký hợp đồng mua bán hoặc thông tin trên CCCD và
          hợp đồng mua bán khác nhau, đơn hàng sẽ bị hủy.{'\n'}CCCD có thể đang
          bản cứng hoặc hình ảnh khách hàng tự chụp lại trên thiết bị cá nhân.
        </p>
        <p>
          Đơn hàng sẽ bị hủy nếu tình trạng thực tế không phù hợp với kết quả tự
          đánh giá của khách hàng trong quá trình kiểm tra của nhân viên.
        </p>
      </div>

      <div className="mt-8 text-center text-[12px]">
        <a href="#" className="font-bold text-[#006bea] underline">
          Xem tại FAQs để biết thêm chi tiết↗
        </a>
      </div>

      <div className="mt-8 text-[11px] leading-normal text-[#666]">
        <p>Hướng dẫn từ công sao lưu dữ liệu với thiết bị Samsung Galaxy:</p>
        <p className="mt-3">
          Samsung Cloud:{' '}
          <a href="#" className="text-[#006bea] underline">
            Xem tại đây↗
          </a>{' '}
          hoặc{' '}
          <a href="#" className="text-[#006bea] underline">
            Video hướng dẫn↗
          </a>
        </p>
        <p>
          Smart Switch:{' '}
          <a href="#" className="text-[#006bea] underline">
            Xem tại đây↗
          </a>{' '}
          hoặc{' '}
          <a href="#" className="text-[#006bea] underline">
            Video hướng dẫn↗
          </a>
        </p>
      </div>
    </div>
  );
};

export default TradeGuide;
